import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  // This is for conditional navigation/rendering
  // Read Notes.md to know why we used 'useNavigate'
  const navItems = [
    {
      name: "Home",
      path: '/',
      active: true
    },

    {
      name: "Login",
      path: '/login',
      active: !authStatus
    },

    {
      name: "Signup",
      path: '/signup',
      active: !authStatus
    },

    {
      name: "All Posts",
      path: '/all-posts',
      active: authStatus
    },

    {
      name: "Add Post",
      path: '/add-post',
      active: authStatus
    }

  ]

  return (
    <header className='mb-5'>
      <Container >
        <nav className='flex'>
          <div className='ml-4'>
            <Link to={'/'}>
              <Logo width={'w-10'} height={'h-10'} />
            </Link>
          </div>

          {/* <li> is the rendering element, so wrap it with () or return it */}
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  {/* Redirect to the link */}
                  <button
                    onClick={() => navigate(item.path)}
                    className='inline-block px-5 py-2 duration-200 hover:bg-blue-300 rounded-full'
                  >{item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

          </ul>
        </nav>
      </Container>
    </header >
  )
}

export default Header
