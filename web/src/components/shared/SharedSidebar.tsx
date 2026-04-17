'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './SharedSidebar.module.css';

interface SidebarItem {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}

interface SharedSidebarProps {
  title: string;
  subtitle?: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  items: SidebarItem[];
  activeItemId: string;
  onItemClick: (id: string) => void;
  itemTypeLabel?: string;
}

export default function SharedSidebar({
  title,
  subtitle,
  searchTerm,
  onSearchChange,
  items,
  activeItemId,
  onItemClick,
  itemTypeLabel = "Categories"
}: SharedSidebarProps) {
  const { t } = useLanguage();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.searchBlock}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder={t('codelab.searchPlaceholder') || "Search..."} 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <nav className={styles.nav}>
        <h3 className={styles.navLabel}>{itemTypeLabel}</h3>
        <div className={styles.itemList}>
          {items.map(item => (
            <button 
              key={item.id} 
              onClick={() => onItemClick(item.id)} 
              className={`${styles.itemBtn} ${activeItemId === item.id ? styles.active : ''}`}
            >
              <span className={styles.itemContent}>
                {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                <span className={styles.itemName}>{item.label}</span>
              </span>
              {item.count !== undefined && item.count > 0 && (
                <span className={styles.countBadge}>{item.count}</span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}
