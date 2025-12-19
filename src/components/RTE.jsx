// RTE -> Real time editor, so you can write content for your blog

import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, label, control, defaultValue = "" }) {
    return (
        <div className='w-full '>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            {/* Since TinyMCE is not a native input/DOM and manages its own state, React form cannot register it directly, so Controller connects TinyMCE’s change events to React form’s form state. */}

            {/* React form cannot register <Editor /> becuase it is not native element, that is why we used <Controller />, it register this field in the React from, new you can get the values of this field using "getValues('content')" */}

            <Controller
                name="content"
                control={control} // Connects the Controller with React form

                // field is an object, onChange is a function inside it
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey='po7u2wwp0o35jwndkv1zhu9489ismpd8jwhx0hmll2w23opr'

                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE

