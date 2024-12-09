import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { logOut } from '@/firebase/auth';

export const AsideMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split('/').at(-1);
  const { resolvedTheme } = useTheme();

  const upperButtons = [
    'dashboard',
    'homework',
    'meetings',
    'documents',
    'chat',
  ];

  const bottomButtons = ['support', 'settings'];

  return (
    <div className="h-[100vh] fixed z-10000 w-[236px] top-0 left-0 pt-[31px] pr-[20px] pl-[24px] pb-[80px] bg-background-second">
      <p className="font-extrabold text-themetext text-[20px] mb-5">Logo</p>
      <div className="flex flex-col justify-between h-full">
        <div>
          {upperButtons.map((btn) => {
            return (
              <Link
                key={uuidv4()}
                className={cn(
                  'h-12 flex items-center aside_menu w-[192px] px-[14px] pl-[16px] rounded-xl box-border',
                  {
                    aside_menu_active: btn === currentPage,
                  }
                )}
                href={`/portal/${btn}`}
              >
                <img
                  src={`/icons/menu_portal_${btn}.svg`}
                  alt={`${btn} icon`}
                  width={20}
                  className={cn('mr-[14px]', {
                    graphic_portal_menu: resolvedTheme === 'dark',
                  })}
                />
                <p className="font-semibold text-[14px] text-themetext upper_first_letter">
                  {btn}
                </p>
              </Link>
            );
          })}
        </div>

        <div>
          {bottomButtons.map((btn) => {
            return (
              <button
                key={uuidv4()}
                className={cn(
                  'h-12 flex items-center aside_menu w-[192px] px-[14px] pl-[16px] rounded-xl box-border',
                  {
                    aside_menu_active: btn === currentPage,
                  }
                )}
                onClick={() => router.push(`/portal/${btn}`)}
              >
                <img
                  src={`/icons/menu_portal_${btn}.svg`}
                  alt={`${btn} icon`}
                  width={20}
                  className={cn('mr-[14px]', {
                    graphic_portal_menu: resolvedTheme === 'dark',
                  })}
                />
                <p className="font-semibold text-themetext text-[14px] upper_first_letter">
                  {btn}
                </p>
              </button>
            );
          })}
          <button
            key={uuidv4()}
            className={cn(
              'h-12 flex items-center aside_menu w-[192px] px-[14px] pl-[16px] rounded-xl box-border'
            )}
            onClick={async() => {
              await logOut();
              router.push('/login');
            }}
          >
            <img
              src={`/icons/menu_portal_logout.svg`}
              alt={`logout icon`}
              width={20}
              className={cn('mr-[14px]', {
                graphic_portal_menu: resolvedTheme === 'dark',
              })}
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
