'use client';
import { cn } from '@/lib/utils';
import { Typography } from '@mui/material';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { SideBarCurrentPlayer } from './SideBarCurrentPlayer';
import { SideBarPlayerList } from './SideBarPlayerList';

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

export function SidebarLayout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border md:flex-row border-neutral-700 bg-neutral-800 text-white',
        'h-screen',
        className,
      )}>
      <Sidebar>
        <SidebarBody className="justify-between gap-10 px-3">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-0">
            <Typography variant="h4" className="text-center">
              FH5 Live Map
            </Typography>
            <SideBarCurrentPlayer />
            <SideBarPlayerList />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="my-2 mr-2 flex flex-1">{children}</div>
    </div>
  );
}

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <motion.div
        className={cn(
          'hidden h-full w-[300px] flex-shrink-0  px-4 py-4 md:flex md:flex-col bg-neutral-800',
          className,
        )}
        animate={{ width: '300px' }}
        {...props}>
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          'flex h-10 w-full flex-row items-center justify-between px-4 py-4 md:hidden bg-neutral-800',
        )}
        {...props}>
        <div className="z-20 flex w-full justify-end">
          <IconMenu2
            className="text-neutral-200"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={cn(
                'fixed inset-0 z-[100] flex h-full w-full flex-col justify-between p-4 sm:p-10 bg-neutral-900',
                className,
              )}>
              <div
                className="absolute right-10 top-10 z-50 text-neutral-200"
                onClick={() => {
                  setOpen(false);
                }}>
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  id,
  ...props
}: {
  link: Links;
  className?: string;
  id?: string;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <a
      href={link.href}
      className={cn('group/sidebar relative px-4 py-1', className)}
      onMouseEnter={() => {
        setHovered(id ?? null);
      }}
      onMouseLeave={() => {
        setHovered(null);
      }}
      {...props}>
      {hovered === id && (
        <motion.div
          layoutId="hovered-sidebar-link"
          className="absolute inset-0 z-10 rounded-lg bg-neutral-900"
        />
      )}
      <div className="relative z-20 flex items-center justify-start gap-2 py-2">
        {link.icon}

        <motion.span
          animate={{ display: 'inline-block', opacity: 1 }}
          className="!m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1 text-neutral-200">
          {link.label}
        </motion.span>
      </div>
    </a>
  );
};
