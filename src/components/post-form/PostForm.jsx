import React, { useCallback, useEffect } from 'react'
import { Button, Select, Input, RTE } from '../index'
import storageService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

// This component is for posting, editing the blog posts

function PostForm({post}) {
  console.log(post);
  
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || 'active',
    }
  })


  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  if (!userData) {
    return navigate('/login')
  }

  // data -> received from useForm()
  const submit = async (data) => {

    // if post exist, then you are here to update the content/image
    if (post) {
      // upload the image (if user updates the image)
      // It will return an object, which has '$id'
      const file = await storageService.uploadFile(data.image[0])

      if (file) {
        // delete the old image only if you upload new image
        // You are storing only the file ID, not the image itself.
        storageService.deleteFile(post.featuredImage)
        console.log("Old image delted");
      }

      // Now update the other content of the post(heading, main content)
      const dbPost = await storageService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })

      // After successful updation, redirect the user to the same post(updated one)
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else { // create a new post

      // upload the new image
      // It will return an object, which has '$id'
      const file = await storageService.uploadFile(data.image[0])

      console.log(file);

      if (file) {
        data.featuredImage = file.$id
      }

      const newPost = await storageService.createPost({
        ...data,
        userId: userData.$id // From store
      })


      // If post created successfully, redirect the user to the post
      if (newPost) {
        navigate(`/post/${newPost.$id}`)
      }
    }
  }


  // This will check the title of the blog(using useForm() 'watch' function) and genertes a slug in real time.
  const generateSlug = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
    } else {
      return "";
    }
  }, [])


  useEffect(() => {

    // It runs every time any field changes
    // * value → all form values
    // * name → the field that changed
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue("slug", generateSlug(value.title,

          // It triggers validation for slug
          { shouldValidate: true }
        ))
      }
    })

    // This is for optimization like (memory leak, multiple listners etc..)
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, setValue, generateSlug])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

      {/* This is input side */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}

          // Runs everytime when user types something
          onInput={(e) => {
            setValue("slug", generateSlug(e.currentTarget.value), { shouldValidate: true });
          }}
        />

        {/* 'control' gives full authority to update and track RTE field values to the 'Controller' */}
        {/* go to RTE for explaination */}
        <RTE label="Content :" control={control} defaultValue={getValues("content")} />
      </div>

      {/* If the post doesn't exist, the image is compulsory (required: true) */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {/* If post exist, get the image preview of that post */}
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full text-center cursor-pointer">
          {post ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
