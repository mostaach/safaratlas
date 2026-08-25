import fs from 'fs';

const filePath = 'src/app/offers/agafay-vip/page.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace old brand colors with new Deep Atlas Blue & Warm Sand
content = content.replace(/#121a17/g, '#07192d'); // midnight slate -> deep atlas blue dark
content = content.replace(/#123b34/g, '#0a233f'); // atlas cedar -> deep atlas blue
content = content.replace(/#f4c36b/g, '#c6a476'); // sunset gold -> warm sand
content = content.replace(/#c95e3d/g, '#c6a476'); // terracotta -> warm sand (for simplicity on this page)

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Colors updated in page.tsx');
