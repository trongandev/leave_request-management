// Hàm bỏ dấu tiếng Việt
export const removeVietnameseTones = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9 ]/g, '');
};

export const getCookie = (req: any, name: string): string | null => {
  const raw = req.headers.cookie;
  if (!raw) return null;

  const part = raw
    .split(';')
    .map((v) => v.trim())
    .find((v) => v.startsWith(name + '='));

  if (!part) return null;
  return decodeURIComponent(part.substring(name.length + 1));
};

export const setCookie = (res) => {};
