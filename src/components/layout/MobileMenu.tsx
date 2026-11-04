
'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  X,
  Menu,
  ChevronDown,
  ChevronRight,
  Home,
  Sparkles,
  Wrench,
  Workflow,
  Info,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Mail,
  Lock,
} from 'lucide-react';

import { type Locale } from '@/lib/i18n/config';
import { type ToolCategory } from '@/types/tool';

export interface MobileMenuProps {
  locale: Locale;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface CategoryItem {
  id: ToolCategory;
  labelKey: string;
  href: string;
}

const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const selectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(
    container.querySelectorAll<HTMLElement>(selectors)
  );
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  locale,
  isOpen,
  onOpen,
  onClose,
}) => {
  const t = useTranslations('home.categories');
  const tCommon = useTranslations('common');

  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const touchStart = useRef<number | null>(null);

  const [internalOpen, setInternalOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    null
  );

  const isControlled =
    isOpen !== undefined && onOpen !== undefined;

  const menuOpen = isControlled ? isOpen : internalOpen;

  // Open menu
  const openMenu = useCallback(() => {
    if (isControlled) {
      onOpen?.();
    } else {
      setInternalOpen(true);
    }
  }, [isControlled, onOpen]);

  // Close menu
  const closeMenu = useCallback(() => {
    setInternalOpen(false);
    onClose?.();
    setExpandedCategory(null);
  }, [onClose]);

  // PDF Tool Categories
  const categories: CategoryItem[] = [
    {
      id: 'edit-annotate',
      labelKey: 'editAnnotate',
      href: `/${locale}/tools?category=edit-annotate`,
    },
    {
      id: 'convert-to-pdf',
      labelKey: 'convertToPdf',
      href: `/${locale}/tools?category=convert-to-pdf`,
    },
    {
      id: 'convert-from-pdf',
      labelKey: 'convertFromPdf',
      href: `/${locale}/tools?category=convert-from-pdf`,
    },
    {
      id: 'organize-manage',
      labelKey: 'organizeManage',
      href: `/${locale}/tools?category=organize-manage`,
    },
    {
      id: 'optimize-repair',
      labelKey: 'optimizeRepair',
      href: `/${locale}/tools?category=optimize-repair`,
    },
    {
      id: 'secure-pdf',
      labelKey: 'securePdf',
      href: `/${locale}/tools?category=secure-pdf`,
    },
  ];

  // Main Navigation
  const navigationItems = [
    {
      label: tCommon('navigation.home'),
      href: `/${locale}`,
      icon: Home,
    },
    {
      label: 'Studio',
      href: `/${locale}/studio`,
      icon: Sparkles,
      badge: 'NEW',
    },
    {
      label: tCommon('navigation.tools'),
      href: `/${locale}/tools`,
      icon: Wrench,
      submenu: true,
    },
    {
      label: 'Workflow',
      href: `/${locale}/workflow`,
      icon: Workflow,
    },
    {
      label: tCommon('navigation.about'),
      href: `/${locale}/about`,
      icon: Info,
    },
    {
      label: 'Blog',
      href: `/${locale}/blog`,
      icon: BookOpen,
    },
    {
      label: tCommon('navigation.faq'),
      href: `/${locale}/faq`,
      icon: HelpCircle,
    },
    {
      label: 'Privacy Policy',
      href: `/${locale}/privacy`,
      icon: ShieldCheck,
    },
    {
      label: tCommon('navigation.contact'),
      href: `/${locale}/contact`,
      icon: Mail,
    },
  ];

  // Body scroll lock and focus management
  useEffect(() => {
    if (menuOpen) {
      previousActiveElement.current =
        document.activeElement as HTMLElement;

      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Restore focus after closing
  useEffect(() => {
    if (!menuOpen && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [menuOpen]);

  // Keyboard support and focus trap
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key === 'Tab' && menuRef.current) {
        const elements = getFocusableElements(menuRef.current);

        if (!elements.length) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, closeMenu]);

  // Swipe to close
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      touchStart.current = event.touches[0].clientX;
    },
    []
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStart.current === null) return;

      const touchEnd = event.changedTouches[0].clientX;
      const difference = touchStart.current - touchEnd;

      if (difference > 100) {
        closeMenu();
      }

      touchStart.current = null;
    },
    [closeMenu]
  );

  // Close after navigation
  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  // Expand Tools submenu
  const toggleTools = useCallback(() => {
    setExpandedCategory((previous) =>
      previous === 'tools' ? null : 'tools'
    );
  }, []);

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON - THREE HORIZONTAL LINES */}
      <button
        type="button"
        onClick={openMenu}
        className="
          md:hidden
          inline-flex items-center justify-center
          h-10 w-10 min-w-10
          rounded-xl
          border border-[hsl(var(--color-border))]
          bg-[hsl(var(--color-background))]
          text-[hsl(var(--color-foreground))]
          hover:bg-[hsl(var(--color-muted))]
          active:scale-95
          transition-all
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[hsl(var(--color-primary))]
        "
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
      >
        <Menu
          className="h-6 w-6"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </button>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="
            fixed inset-0
            bg-black/50 backdrop-blur-[2px]
            z-[9998] md:hidden
          "
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* MOBILE MENU DRAWER */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 right-0
          h-[100dvh]
          w-[340px] max-w-[88vw]
          bg-[hsl(var(--color-background))]
          border-l border-[hsl(var(--color-border))]
          shadow-2xl
          z-[9999] md:hidden
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          ${!menuOpen ? 'pointer-events-none invisible' : 'visible'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            p-4
            border-b border-[hsl(var(--color-border))]
            shrink-0
          "
        >
          <Link
            href={`/${locale}`}
            onClick={handleLinkClick}
            className="flex items-center gap-2"
          >
            <span className="
              text-xl font-bold
              text-[hsl(var(--color-foreground))]
            ">
              PDFTara
            </span>

            <span className="
              text-[10px] font-semibold
              px-2 py-0.5 rounded-full
              bg-[hsl(var(--color-primary)/0.1)]
              text-[hsl(var(--color-primary))]
            ">
              MENU
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            className="
              flex items-center justify-center
              h-10 w-10 rounded-xl
              hover:bg-[hsl(var(--color-muted))]
              transition-colors
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[hsl(var(--color-primary))]
            "
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav
          className="
            flex-1 overflow-y-auto
            overscroll-contain p-4
          "
          aria-label="Mobile navigation"
        >
          <p className="
            px-4 mb-3
            text-xs font-semibold uppercase tracking-wider
            text-[hsl(var(--color-muted-foreground))]
          ">
            Main Navigation
          </p>

          <ul className="flex flex-col gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  {item.submenu ? (
                    <div>
                      {/* TOOLS BUTTON */}
                      <button
                        type="button"
                        onClick={toggleTools}
                        className="
                          flex items-center justify-between
                          w-full px-4 py-3
                          rounded-xl
                          text-[hsl(var(--color-foreground))]
                          hover:bg-[hsl(var(--color-muted))]
                          transition-colors
                        "
                        aria-expanded={
                          expandedCategory === 'tools'
                        }
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="
                            h-5 w-5
                            text-[hsl(var(--color-muted-foreground))]
                          " />

                          <span className="font-medium">
                            {item.label}
                          </span>
                        </span>

                        {expandedCategory === 'tools' ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>

                      {/* TOOLS SUBMENU */}
                      {expandedCategory === 'tools' && (
                        <ul className="
                          ml-6 mt-1 mb-2
                          pl-3
                          border-l-2
                          border-[hsl(var(--color-border))]
                        ">
                          <li>
                            <Link
                              href={item.href}
                              onClick={handleLinkClick}
                              className="
                                block px-4 py-2.5
                                rounded-lg text-sm font-semibold
                                text-[hsl(var(--color-primary))]
                                hover:bg-[hsl(var(--color-muted))]
                              "
                            >
                              All PDF Tools
                            </Link>
                          </li>

                          {categories.map((category) => (
                            <li key={category.id}>
                              <Link
                                href={category.href}
                                onClick={handleLinkClick}
                                className="
                                  block px-4 py-2.5
                                  rounded-lg text-sm
                                  text-[hsl(var(--color-muted-foreground))]
                                  hover:text-[hsl(var(--color-primary))]
                                  hover:bg-[hsl(var(--color-muted))]
                                  transition-colors
                                "
                              >
                                {t(category.labelKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    /* NORMAL NAVIGATION LINK */
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className="
                        flex items-center justify-between
                        px-4 py-3
                        rounded-xl
                        text-[hsl(var(--color-foreground))]
                        hover:bg-[hsl(var(--color-muted))]
                        transition-colors
                      "
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="
                          h-5 w-5
                          text-[hsl(var(--color-muted-foreground))]
                        " />

                        <span className="font-medium">
                          {item.label}
                        </span>
                      </span>

                      {item.badge && (
                        <span className="
                          text-[10px] font-bold
                          px-2 py-1 rounded-full
                          bg-blue-600 text-white
                        ">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* PRIVACY CARD */}
          <div className="
            mt-6 p-4 rounded-xl
            border border-[hsl(var(--color-border))]
            bg-[hsl(var(--color-muted)/0.3)]
          ">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-green-500" />

              <span className="font-semibold text-sm">
                100% Private
              </span>
            </div>

            <p className="
              text-xs leading-relaxed
              text-[hsl(var(--color-muted-foreground))]
            ">
              Your files never leave your device.
              Process PDFs privately in your browser.
            </p>
          </div>
        </nav>

        {/* FOOTER */}
        <div className="
          shrink-0 p-4
          border-t border-[hsl(var(--color-border))]
          text-center
        ">
          <p className="
            text-xs
            text-[hsl(var(--color-muted-foreground))]
          ">
            © {new Date().getFullYear()} PDFTara
          </p>

          <p className="
            text-xs mt-1
            text-[hsl(var(--color-muted-foreground))]
          ">
            Free & Private PDF Tools
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
