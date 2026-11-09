type IconName = 'menu' | 'close' | 'previous' | 'next' | 'expand';
const paths: Record<IconName, string> = {
  menu: 'M4 8h16M4 16h16', close: 'm6 6 12 12M6 18 18 6',
  previous: 'm14 6-6 6 6 6', next: 'm10 6 6 6-6 6',
  expand: 'M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4',
};
export function Icon({name}: {name: IconName}) {
  return <svg className="ui-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]}/></svg>;
}
