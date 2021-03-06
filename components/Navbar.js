import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0px 2px 8px 0px #00000040;

  position: fixed;
  width: 100%;
  z-index: 100;

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: row;
    height: ${({ theme }) => theme.navbarHeight};
  }
`;

const Margin = styled.div`
  padding-bottom: ${({ theme }) => theme.navbarHeight};
`;

const NavbarLogo = styled.h1`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  margin: 0;
`;

const NavbarNav = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavbarItem = styled.li`
  height: 36px;
  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    height: ${({ theme }) => theme.navbarHeight};
  }
`;

const NavbarLink = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  font-weight: bold;
  border-bottom: 4px solid
    ${({ active, theme }) => (active ? theme.blue1 : "transparent")};
  color: ${({ active, theme }) => (active ? theme.txtBlack : theme.txtPrimary)};
  &:hover {
    color: ${({ theme }) => theme.txtBlack};
  }
`;

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <>
      <NavbarContainer>
        <NavbarLogo>AniList</NavbarLogo>
        <NavbarNav>
          <NavbarItem>
            <Link href="/anime?page=1" passHref>
              <NavbarLink active={pathname === "/anime"}>Explore</NavbarLink>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/collection" passHref>
              <NavbarLink active={pathname === "/collection"}>
                My Collection
              </NavbarLink>
            </Link>
          </NavbarItem>
        </NavbarNav>
      </NavbarContainer>
      <Margin />
    </>
  );
};

export default Navbar;
