import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm'
export default function glideCarosel() {
        if (!document.querySelector('.glide')) return;
        new Glide('.glide').mount({ Controls })
}