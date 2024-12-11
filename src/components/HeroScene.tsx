import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelsRef = useRef<THREE.Group[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create floating objects with more complex geometries
    const createFloatingObject = (geometry: THREE.BufferGeometry, color: string, position: THREE.Vector3) => {
      const material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
        shininess: 100,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);
      modelsRef.current.push(group);
      
      return group;
    };

    // Create multiple floating objects with more interesting shapes
    const briefcase = createFloatingObject(
      new THREE.BoxGeometry(0.8, 0.6, 0.3),
      '#9b87f5',
      new THREE.Vector3(-2, 1, 0)
    );

    const laptop = createFloatingObject(
      new THREE.BoxGeometry(1, 0.1, 0.7),
      '#1A1F2C',
      new THREE.Vector3(2, -1, 0)
    );

    const document = createFloatingObject(
      new THREE.PlaneGeometry(0.7, 0.9),
      '#F6F6F7',
      new THREE.Vector3(0, 0.5, 0)
    );

    const sphere = createFloatingObject(
      new THREE.SphereGeometry(0.3, 32, 32),
      '#8B5CF6',
      new THREE.Vector3(1.5, 1.5, -1)
    );

    const torus = createFloatingObject(
      new THREE.TorusGeometry(0.3, 0.1, 16, 32),
      '#D946EF',
      new THREE.Vector3(-1.5, -1.5, -1)
    );

    // Mouse move handler for interactive parallax effect
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      modelsRef.current.forEach((group, index) => {
        // Floating animation
        group.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        
        // Rotation animation
        group.rotation.y += 0.005;
        group.rotation.x += 0.002;

        // Mouse interaction
        group.position.x += (mouseRef.current.x * 0.1 - group.position.x) * 0.05;
        group.position.y += (mouseRef.current.y * 0.1 - group.position.y) * 0.05;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      modelsRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10"
      style={{ height: '100%', minHeight: '600px' }}
    />
  );
};