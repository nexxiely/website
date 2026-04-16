document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Reveal on scroll
  const revealElements = document.querySelectorAll(".reveal-up");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const navbar = document.querySelector(".navbar");

  function updateActiveLink() {
    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("current", "active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("current", "active");
      }
    });
  }

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", () => {
    updateActiveLink();
    handleNavbarScroll();
  });

  updateActiveLink();
  handleNavbarScroll();

  // Close mobile nav after click
  const navCollapse = document.getElementById("mainNav");
  const bsCollapse = navCollapse ? new bootstrap.Collapse(navCollapse, { toggle: false }) : null;

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // Contact form validation
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      let valid = true;

      const validateField = (field, condition) => {
        if (condition) {
          field.classList.remove("is-invalid");
          field.classList.add("is-valid");
        } else {
          field.classList.remove("is-valid");
          field.classList.add("is-invalid");
          valid = false;
        }
      };

      validateField(name, name.value.trim().length >= 2);
      validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      validateField(subject, subject.value.trim().length >= 3);
      validateField(message, message.value.trim().length >= 10);

      if (valid) {
        formMessage.textContent = "Message submitted successfully. Your form is working properly.";
        formMessage.className = "mt-2 small success";
        form.reset();

        [name, email, subject, message].forEach((field) => {
          field.classList.remove("is-valid");
        });
      } else {
        formMessage.textContent = "Please complete all fields correctly before submitting.";
        formMessage.className = "mt-2 small error";
      }
    });
  }

  // Project modal
  const projectButtons = document.querySelectorAll(".view-project-btn");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalDescription = document.getElementById("modalProjectDescription");
  const modalImage = document.getElementById("modalProjectImage");
  const projectModalElement = document.getElementById("projectModal");

  if (projectModalElement) {
    const projectModal = new bootstrap.Modal(projectModalElement);

    projectButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modalTitle.textContent = button.dataset.title || "Project";
        modalDescription.textContent = button.dataset.description || "No description available.";
        modalImage.src = button.dataset.image || "";
        modalImage.alt = button.dataset.title || "Project image";
        projectModal.show();
      });
    });
  }

  // Download CV buttons
  const cvButtons = document.querySelectorAll("#downloadCvBtn, #downloadCvBtn2");
  cvButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Add your real CV file link here later, for example: files/Alyza-CV.pdf");
    });
  });
});
//3d
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import {gsap} from "https://cdn.skypack.dev/gsap";
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;  
const loader = new GLTFLoader();
loader.load('slime.glb', 
    function (gltf) {
        bee = gltf.scene;
        bee.scale.set(50, 50, 50);
        scene.add(bee);
        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);

const rerender = new THREE.WebGLRenderer({alpha: true});
rerender.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(rerender.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

 
const reRender3D = () => {
  requestAnimationFrame(reRender3D);
  rerender.render(scene, camera);
  if ( mixer) mixer.update(0.02); 
}
reRender3D();

let arrPositionModel = [
  {
    id: 'home',
    position: { x: -1.5, y: -0.5, z: 0 },
    rotation: { x: 0, y: 0.5, z: 0 }
  },
  {
    id: 'about',
    position: { x: 2, y: -1, z: -5 },
    rotation: { x: 0.5, y: -0.5, z: 0 }
  },
  {
    id: 'projects',
    position: { x: -2, y: -1, z: -5 },
    rotation: { x: 0, y: 0.5, z: 0 }
  },
  {
    id: 'contact',
    position: { x: 1, y: -1, z: 5 },
    rotation: { x: 0.3, y: 0, z: 0 }
  },
  {
    id: 'animation-images',
    position: { x: 1, y: -1, z: 5 },
    rotation: { x: 0.3, y: 0, z: 0 }
  },
];

const modelMove = () => {
  const sections = document.querySelectorAll('.section');
  let currentSection;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 3 ){
      currentSection = section.id;
    }
  });
  let position_active = arrPositionModel.findIndex(
    (val) => val.id === currentSection);
  if(position_active >= 0){
    let new_coordinates = arrPositionModel[position_active];
    gsap.to(bee.position, {
      x: new_coordinates.position.x,
      y: new_coordinates.position.y,
      z: new_coordinates.position.z,
      duration: 3,
      ease: "power1.out"
    })
    gsap.to(bee.rotation, {
      x: new_coordinates.rotation.x,
      y: new_coordinates.rotation.y,
      z: new_coordinates.rotation.z,
      duration: 3,
      ease: "power1.out"
    })
  }
}

window.addEventListener('scroll', () => {
  if (bee) {
    modelMove();
  }
});

window.addEventListener('resize', () => {
  rerender.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});