import { Button, Container, Logo, LogoutBtn } from '../index'
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
      active: authStatus
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
    <header className=' py-2 border sticky top-2 z-10 bg-white rounded-md mx-2 shadow-[2px_3px_0_0_rgba(0,0,0,1)]'>
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
                  <Button className='shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]'
                    onClick={() => navigate(item.path)}>
                    {item.name}
                  </Button>
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
