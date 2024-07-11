import styled from "styled-components";

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-links {
    display: flex;
    gap: 1rem;
  }

  .nav-link {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: bold;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    // margin-top: -3rem;
  }
  h1 {
    font-weight: 500;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }
  
  d {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
    color: var(--primary-color);
    font-weight: bold;
  }
  .top-btn {
    padding: 0.7rem 0.9rem;
  }
  .top-btn-inactive {
    padding: 0.7rem 0.9rem;
    background-color: var(--grey-300);
  }

  .menu-button {
    display: none;
  }
  @media (max-width: 992px) {
    .nav-links {
      display: none; /* Hide links */
    }

    .menu-button {
      display: inline-block;
      padding: 0.75rem 1rem;
      background-color: var(--primary-color);
      color: #000;
      border: none;
      cursor: pointer;
    }
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
