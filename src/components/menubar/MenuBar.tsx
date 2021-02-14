import { mdiApple, mdiAppleAirplay, mdiWifiStrength4 } from '@mdi/js';
import Tippy from '@tippyjs/react/headless';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { sticky } from 'tippy.js';
import { VolumeLowSVG } from '__/assets/sf-icons/volume-low.svg';
import { activeMenuStore } from '__/stores/active-menu.store';
import { menuBarMenusStore } from '__/stores/menubar.store';
import { theme } from '__/theme';
import { AppIcon } from '../utils/AppIcon';
import { ButtonBase } from '../utils/ButtonBase';
import { ActionCenterToggle } from './ActionCenter/ActionCenterToggle';
import { Menu } from './Menu';
import { MenuBarTime } from './MenuBarTime';
import { MenuIconButton } from './MenuIconButton';

const MenuBar = (): React.ReactElement => {
  const [currentAppMenus] = useAtom(menuBarMenusStore);
  const [activeMenu, setActiveMenu] = useAtom(activeMenuStore);

  return (
    <Header>
      <AppleIconButton>
        <AppIcon size={18} path={mdiApple} />
      </AppleIconButton>

      {/* @ts-ignore */}
      {Object.keys(currentAppMenus).map((menuID: keyof typeof currentAppMenus) => (
        <Tippy
          key={menuID}
          trigger={`focusin ${activeMenu ? 'mouseenter' : 'click'}`}
          hideOnClick={false}
          placement="bottom-start"
          sticky
          zIndex={99999}
          plugins={[sticky]}
          onShow={() => void setActiveMenu(menuID)}
          interactive
          appendTo={document.body}
          render={(attrs) => (
            <div {...attrs}>
              {/* @ts-ignore */}
              <Menu menu={currentAppMenus[menuID].menu}>Hello</Menu>
            </div>
          )}

          // onClickOutside={({ hide }, e) => {
          //   console.log(e);
          //   setActiveMenu('');
          //   hide();
          // }}
        >
          <span>
            <MenuButton
              {...(menuID === 'default' && { style: { fontWeight: 600, margin: `0 6px` } })}
            >
              {currentAppMenus[menuID].title}
            </MenuButton>
          </span>
        </Tippy>
      ))}

      <Spacer />

      <MenuIconButton>
        <AppIcon size={24} path={mdiAppleAirplay} />
      </MenuIconButton>

      <MenuIconButton>
        <AppIcon size={24} path={mdiWifiStrength4} />
      </MenuIconButton>

      <MenuIconButton>
        <VolumeLowSVG />
      </MenuIconButton>

      <ActionCenterToggle />

      <ButtonBase>
        <MenuBarTime />
      </ButtonBase>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  height: 1.4rem;

  background-color: hsla(${theme.colors.light.hsl}, 0.3);
  backdrop-filter: blur(6px);

  color: ${theme.colors.light.contrast};
  fill: ${theme.colors.light.contrast};

  button {
    font-weight: 500;
    font-size: 0.8rem;
    font-family: ${theme.typography.fontFamily};

    letter-spacing: 0.3px;

    position: relative;

    padding: 0 0.2rem;
    margin: 0 0.3rem;
  }
`;

const AppleIconButton = styled(ButtonBase)`
  border-radius: 30px;

  padding: 0 0.5rem;
  margin: 0 0.6rem;
`;

const MenuButton = styled(ButtonBase)`
  font-weight: 500;
`;

const Spacer = styled.span`
  flex: 1 1 auto;
`;

export { MenuBar };
