export default function initTransitionMethods() {
  function beforeEnter(el) {
    console.log('el=>', el);
  }
  function enter(el) {
    console.log(el)
  }
  function afterEnter(el) {
    console.log(el)
  }
  function beforeLeave(el) {
    console.log(el)
  }
  function leave(el) {
    console.log(el)
  }
  function afterLeave(el) {
    console.log(el)
  }
  return {
    beforeEnter,
    enter,
    afterEnter,
    beforeLeave,
    leave,
    afterLeave,
  }
}
