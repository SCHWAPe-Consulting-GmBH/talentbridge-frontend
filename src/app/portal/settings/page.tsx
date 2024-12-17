'use client';

import GlobalSetting from '@/components/portal/globalSetting';
import ThemeSwitch from '@/components/themeSwitcher';
import cn from 'classnames';
import { useState } from 'react';

const PortalSettings = () => {
  const [settingsOption, setSettingsOption] = useState('page1');
  return (
    <div className="mb-[30px] mt-[30px] flex gap-8">
      <ul className="w-[172px]">
        <li
          className={cn('pl-[15px] pt-3 pb-3 cursor-pointer', {
            'bg-background-second': settingsOption === 'page1',
          })}
          onClick={() => setSettingsOption('page1')}
        >
          Global Setting
        </li>
        <li
          className={cn('pl-[15px] pt-3 pb-3 cursor-pointer', {
            'bg-background-second': settingsOption === 'page2',
          })}
          onClick={() => setSettingsOption('page2')}
        >
          Setting1
        </li>
        <li
          className={cn('pl-[15px] pt-3 pb-3 cursor-pointer', {
            'bg-background-second': settingsOption === 'page3',
          })}
          onClick={() => setSettingsOption('page3')}
        >
          Setting2
        </li>
      </ul>
      {settingsOption === 'page1' && (
        <div>
          <GlobalSetting />
        </div>
      )}
      {settingsOption === 'page2' && <div><ThemeSwitch /></div>}
      {settingsOption === 'page3' && <div>Setting2 Content</div>}
    </div>
  );
};

export default PortalSettings;
