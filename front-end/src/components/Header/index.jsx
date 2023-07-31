import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


// CSS
import Wrapper from './styles';

function Header() {
  return <Wrapper>
          <Link to="/books">
            <img className='logo' src={process.env.PUBLIC_URL + '/assets/logo_with.png'} alt="" />
          </Link>
    <div className='links'>
      <NavLink to='/books' className={({ isActive }) => isActive ? 'active' : undefined}>책장</NavLink>
      <NavLink to='/guide' className={({ isActive }) => isActive ? 'active' : undefined}>이용 가이드</NavLink>
      <NavLink to='/profile' className={({ isActive }) => isActive ? 'active' : undefined}>회원 정보</NavLink>
    </div>
  </Wrapper>;
}

export default Header;
