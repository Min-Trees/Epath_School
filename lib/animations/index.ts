/**
 * EPath Animation System - Main Export
 * Central export point for all animation utilities
 */

// Config exports
export {
  ANIMATION_DURATION,
  ANIMATION_EASE,
  STAGGER_DELAY,
  SCROLL_VIEWPORT,
  COUNTER_CONFIG,
  PAGE_TRANSITION,
  getTransition,
  getSpring,
} from './config'
export type { AnimationDuration, AnimationEase, StaggerDelay } from './config'

// Variants exports
export {
  // Entrance
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeIn,
  scaleIn,
  scaleInBounce,
  
  // Stagger
  staggerFadeInUp,
  staggerFadeIn,
  staggerScaleIn,
  staggerFadeInLeft,
  staggerFadeInRight,
  
  // Slide
  slideInFromRight,
  slideInFromBottom,
  slideInFromTop,
  
  // Page Transition
  pageTransition,
  pageTransitionScale,
  
  // Hover/Tap
  hoverScaleUp,
  hoverScaleDown,
  hoverLift,
  buttonHover,
  
  // Loop/Ambient
  float,
  pulse,
  wiggle,
  bounce,
  glowPulse,
  
  // Modal
  modalIn,
  backdropIn,
} from './variants'
export type { AnimationVariant } from './variants'

// Hooks exports
export {
  useScrollReveal,
  useStaggerContainer,
  useCounter,
  useSpringCounter,
  useHoverScale,
} from './hooks'
export type {
  UseStaggerResult,
  UseCounterResult,
} from './hooks'
