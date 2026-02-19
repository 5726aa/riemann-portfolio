document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    const mobileMenu = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }
    createColorCube('3d-interaction-container');
    function createColorCube(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshNormalMaterial({
            wireframe: true,
            transparent: true,
            opacity: 1
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.005;
            cube.rotation.x += (mouseY * 2 - cube.rotation.x) * 0.05;
            cube.rotation.y += (mouseX * 2 - cube.rotation.y) * 0.05;
            const scrollY = window.scrollY;
            cube.position.y = Math.sin(scrollY * 0.002) * 0.2;
            renderer.render(scene, camera);
        }
        animate();
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
});