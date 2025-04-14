import React from "react";
import styled from "styled-components";
import { partnerColor, partnerColorAlpha } from "./Header.tsx";

export const SideNav = ({ onClick }) => {
  return (
    <SideNavShell>
      <StyledSideNav>
        <StyledNavItem onClick={() => onClick("capital")}>
          Capital
        </StyledNavItem>
      </StyledSideNav>
    </SideNavShell>
  );
};

const SideNavShell = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const StyledSideNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledNavItem = styled.div`
  display: flex;
  color: ${partnerColor};
  background-color: ${partnerColorAlpha};
  padding: 8px 16px;
  border-radius: 4px;
  justify-content: center;
  cursor: pointer;
`;
