const TEAM_ICONS: Record<string, string> = {
  'VR CONCEPT FC': '/team-icons/vr-concept-fc.svg',
  'Digital FC': '/team-icons/digital-fc.svg',
  'Innovation FC': '/team-icons/innovation-fc.svg',
  'Code Warriors': '/team-icons/code-warriors.svg',
  'TECH United': '/team-icons/tech-united.svg',
  'Pixel FC': '/team-icons/pixel-fc.svg',
};

export const DEFAULT_TEAM_ICON = '/team-icons/default-team.svg';

export function getTeamIcon(teamName: string) {
  return TEAM_ICONS[teamName] ?? DEFAULT_TEAM_ICON;
}
