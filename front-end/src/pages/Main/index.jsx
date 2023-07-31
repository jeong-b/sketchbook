import { useState } from 'react';

import Wrapper from './styles';
import PasswordModal from '../../components/PasswordModal';

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log('handleModal');
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <Wrapper className='root'>
      <h1>Main</h1>
      <span onClick={openModal}>test</span>
      <PasswordModal closeModal={closeModal} isModalOpen={isModalOpen} />
    </Wrapper>);
}

export default Main;
