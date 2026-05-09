import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './ScrollableFrame.module.css';

type ScrollableFrameProps = {
  children: ReactNode;
  isScrollable: boolean;
  className?: string;
  contentClassName?: string;
  maxHeight?: string;
  tabletMaxHeight?: string;
  mobileMaxHeight?: string;
};

export function ScrollableFrame({
  children,
  isScrollable,
  className,
  contentClassName,
  maxHeight = '560px',
  tabletMaxHeight,
  mobileMaxHeight,
}: ScrollableFrameProps) {
  const cssVariables = {
    '--scrollable-frame-max-height': maxHeight,
    '--scrollable-frame-tablet-max-height': tabletMaxHeight ?? maxHeight,
    '--scrollable-frame-mobile-max-height': mobileMaxHeight ?? maxHeight,
  } as CSSProperties;

  return (
    <div
      className={clsx(
        styles.frame,
        isScrollable && styles.frameWithFade,
        className,
      )}
      style={cssVariables}
    >
      <div
        className={clsx(
          styles.content,
          !isScrollable && styles.contentWithoutScrollbar,
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
