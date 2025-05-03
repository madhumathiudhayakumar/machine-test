import slide1 from '../assets/slideimage1.jpg';
import slide2 from '../assets/slideimage2.jpg';
import slide3 from '../assets/slideimage3.jpg';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

export const slidesData = [
  {
    image: slide1,
    name: "slide1"
  },
  {
    image: slide2,
    name: "slide2"
  },
  {
    image: slide3,
    name: "slide3"
  }
];

