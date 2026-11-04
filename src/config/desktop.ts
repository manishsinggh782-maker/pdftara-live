export const VERSION = '0.1.0';
export const RELEASE_BASE =
  'https://github.com/anuajsingh256-design/PDFTara-Releases/releases/download';

export interface DesktopFile {
  id: string;
  os: 'windows' | 'mac' | 'linux';
  label: string;
  note: string;
  fileName: string;
  size: string;
}

export const DESKTOP_FILES: DesktopFile[] = [
  { id: 'windows', os: 'windows', label: 'Windows Installer', note: 'Windows 10 / 11 (64-bit)', fileName: `PDFTara-Studio-${VERSION}-win-x64-setup.exe`, size: '102 MB' },
  { id: 'windows-portable', os: 'windows', label: 'Windows Portable', note: 'No installation needed', fileName: `PDFTara-Studio-${VERSION}-win-x64-portable.exe`, size: '102 MB' },
  { id: 'mac-apple-silicon', os: 'mac', label: 'macOS Apple Silicon', note: 'M1, M2, M3, M4 chips', fileName: `PDFTara-Studio-${VERSION}-mac-arm64.dmg`, size: '126 MB' },
  { id: 'mac-intel', os: 'mac', label: 'macOS Intel', note: 'Intel-based Macs', fileName: `PDFTara-Studio-${VERSION}-mac-x64.dmg`, size: '131 MB' },
  { id: 'linux-appimage', os: 'linux', label: 'Linux AppImage', note: 'Runs on most distros', fileName: `PDFTara-Studio-${VERSION}-linux-x86_64.AppImage`, size: '138 MB' },
  { id: 'linux-deb', os: 'linux', label: 'Linux .deb', note: 'Ubuntu / Debian', fileName: `PDFTara-Studio-${VERSION}-linux-amd64.deb`, size: '87 MB' },
];

export function getDesktopFile(id: string) {
  return DESKTOP_FILES.find((f) => f.id === id);
}

export function getReleaseUrl(fileName: string) {
  return `${RELEASE_BASE}/v${VERSION}/${fileName}`;
}