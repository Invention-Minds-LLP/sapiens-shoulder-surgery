import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { CommonModule } from '@angular/common';
import { Footer } from "./footer/footer";
import { Form } from "./form/form";
import { VisitUs } from "./visit-us/visit-us";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, CommonModule, Footer, Form, VisitUs],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('shoulder-surgery');
  @ViewChild('triggerSection') triggerSection!: ElementRef;
  specialistData = [
    {
      img: "imgs/img-1.png",
      text: "Persistent hand pain, wrist pain, elbow pain or shoulder pain",
      bg: "#dff5ea"
    },
    {
      img: "imgs/img-2.png",
      text: "Difficulty lifting the arm or shoulder stiffness",
      bg: "#e6f7ef"
    },
    {
      img: "imgs/img-3.png",
      text: "Numbness or tingling in fingers or hand",
      bg: "#efe6ff"
    },
    {
      img: "imgs/img-4.png",
      text: "Weak grip strength or hand weakness",
      bg: "#e6f0ff"
    },
    {
      img: "imgs/img-5.png",
      text: "Pain during daily activities, work, or sports",
      bg: "#e0f7f2"
    }
  ];

  conditionData = [
    {
      img: "imgs/condition-1.png",
      heading: "Hand and Wrist Surgery",
      para: "Treatment for carpal tunnel syndrome, hand fractures, tendon injuries, and arthritis"
    },
    {
      img: "imgs/condition-2.png",
      heading: "Elbow Surgery",
      para: "Tennis elbow, golfer’s elbow, elbow stiffness, and ligament injuries"
    },
    {
      img: "imgs/condition-3.png",
      heading: "Shoulder Surgery",
      para: "Rotator cuff tear, frozen shoulder, shoulder dislocation, and shoulder arthritis"
    },
    {
      img: "imgs/condition-4.png",
      heading: "Nerve Compression Treatment",
      para: "Microsurgical treatment for nerve pain, numbness, and weakness"
    },

  ];

  steps = [
    {
      step: 1,
      title: "Orthopedic Evaluation",
      desc: "Detailed examination with imaging tests like X-ray or MRI"
    },
    {
      step: 2,
      title: "Treatment Planning",
      desc: "Non-surgical or surgical treatment explained clearly"
    },
    {
      step: 3,
      title: "Surgical or Non-Surgical Treatment",
      desc: "Procedures performed using safe and modern techniques"
    },
    {
      step: 4,
      title: "Post-Treatment Care",
      desc: "Pain management, splints, and wound care"
    },
    {
      step: 5,
      title: "Physiotherapy & Recovery",
      desc: "Rehabilitation to restore strength and movement"
    }
  ];

  handConditions = {
    image: "/imgs/conditions-img.png",
    title: "Common Hand to Shoulder Conditions",
    list: [
      "Carpal tunnel syndrome",
      "Tennis elbow and golfer’s elbow",
      "Frozen shoulder",
      "Rotator cuff injury",
      "Hand, wrist, and shoulder fractures",
      "Nerve compression in arm"
    ]
  };

  treatments = {
    image: "/imgs/treatement-img.png",
    title: "Common Hand to Shoulder Conditions",
    list: [
      "Long-term pain relief",
      "Improved arm and shoulder mobility",
      "Faster recovery with proper physiotherapy",
      "Better quality of life and work performance"
    ]
  };

  faqs = [
    {
      img: "/imgs/Info.svg",
      question: "Is hand to shoulder surgery safe?",
      answer: "Yes, when performed by an experienced orthopedic surgeon after proper evaluation."
    },
    {
      img: "/imgs/Flag.svg",
      question: "Is physiotherapy necessary after treatment?",
      answer: "Yes, physiotherapy is essential for full recovery and strength."
    },
    {
      img: "/imgs/Calendar.svg",
      question: "How long does recovery take?",
      answer: "Recovery time depends on the condition and treatment type."
    },
    {
      img: "/imgs/User.svg",
      question: "Is surgery always required?",
      answer: "No. Many conditions improve with non-surgical treatment."
    }
  ];
  ngOnInit() {
    const popupClosed = localStorage.getItem('popupClosed');

    if (!popupClosed) {
      setTimeout(() => {
        this.openPopup();
      }, 500); // small delay for smooth UX
    } else {
      this.showFloatingIcon = true;
    }
  }

  activeIndex: number | null = null;
  popupClosed = false;
  popupTriggered = false;
  showFloatingIcon = false;
  showMessageCard = false;
  hideMessageAnimation = false;

  toggleFAQ(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
    this.showFloatingIcon = false;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.showFloatingIcon = true;

    // show message
    this.showMessageCard = true;
    this.hideMessageAnimation = false;

    // start fade out after 4 sec
    setTimeout(() => {
      this.hideMessageAnimation = true;
    }, 4000);

    // remove element after animation
    setTimeout(() => {
      this.showMessageCard = false;
    }, 5000);
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (!this.triggerSection || this.popupTriggered || this.popupClosed) return;

    const rect = this.triggerSection.nativeElement.getBoundingClientRect();

    if (rect.bottom <= window.innerHeight) {
      this.openPopup();
      this.popupTriggered = true;
    }
  }






}
