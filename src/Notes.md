# Blog - MEGA PROJECT

## Appwrite

* We will be using `appwrite` for backend and auth for this this project, it is open source and free.

## About .env 

* This is the file where API Keys, Passwords and other environmental varibles are stored.

* `IT MUST BE IN THE ROOT DIRECTORY`

* If you are using `create-react-app` (core react), then you have to give the prefix name `REACT_APP` while making any variable.

    * Ex: `REACT_APP`_USER_PASSWORD=123
    * Access these variable using `process.env.REACT_APP_USER_PASSWORD`
    * Because `.env` is defined inside `process`

* Since we are using `vite`, we should give prefix name `VITE_`

    * Ex: `VITE_`USER_ID=123JDA
    * Access these variables using `import.meta.env.VITE_USER_ID`


## Link vs useNavigate()

`<Link>`
* Used for simple navigation
* No logic, no conditions
* Navigation happens immediately
* Best for static links (About, Contact, Footer links)

`navigation or useNavigate()`

* Navigation after some logic
    * login
    * logout
    * form submit

* Navigation after async operations
* Conditional redirects (auth-based)

```javascript 
// Ex: 
    dispatch(logout())
    navigate('/login')
```

# React.forwardRef — Notes

---

## What is `forwardRef`?

- `forwardRef` is a React API that allows a **parent component to access a child component’s DOM element by passing ref**.
- By default, **refs do NOT work with custom components**.
- `forwardRef` explicitly forwards the ref to a real DOM element (like `input`, `button`, etc.).

---

## Why `forwardRef` exists

- React **blocks refs on custom components`(<Input />, <Header /> etc)`** by default.
- But sometimes the parent **needs direct DOM control**, such as:
  - focusing an input
  - scrolling to an element
  - selecting text
- `forwardRef` is the official and safe escape hatch.

---

## How `forwardRef` works (step-by-step)

### 1. Parent creates a ref
```js
const inputRef = useRef(null)
```

### 2. Parent passes ref to child
```js
<Input ref={inputRef} />
```


### 3. Child receives ref using `forwardRef`
```js
const Input = React.forwardRef((props, ref) => {
  return <input ref={ref} />
})
```
### 4. Ref attaches to DOM
- `ref.current` now points to the `<input>` DOM node
- Parent can directly control it
    
### Important rule
`forwardRef` always receives two arguments only:

```js 
(props, ref)
```
- `ref` is not part of props
- React injects `ref` automatically


## React Form

* `react-hook-form` collects input values automatically and passes them to your `login function`.

  ### What actually happens step-by-step:

    ### 1.  `useForm()` sets up a form controller:

    ```js
    const { register, handleSubmit } = useForm()
    ```

    - `register` → connects inputs to the form
    - `handleSubmit` → wraps your submit function

    ### 2. `register()` wires inputs into the form state

    ```js
    <Input {...register("email")} />
    <Input {...register("password")} />
    ```

    #### This does three things internally:

    - Tracks input value
    - Tracks validation
    - Stores data under keys:

    ```js
    {
      email: "...",
      password: "..."
    }
    ```

    ### 3. `handleSubmit(login)`
    * This prevents the default submit, then it will `build the data object`.
    * This is the data object, that `login function is receiving as a prop`.


    * `THE 'react-hook-form' CREATES A 'ref' AUTOMATICALLY, THIS IS USED IN '<Input />'  COMPONENTS, WHICH ARE 'forwardRef' COMPONENTS`


  ### Other important functions of `useForm()`

    - `watch`: Monitor the all the form fields continuosly
    - `control`: This gives the control of the form
    - `setValue`: To set value in the form(like input fields) 
    - `getValues`: This gives the value of the form