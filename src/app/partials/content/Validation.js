
export default class Validation {
    constructor() {
        this.forms = document.querySelectorAll('.needs-validation');
    }

    validateForm() {
        Array.prototype.slice.call(this.forms).forEach((form) => {
            form.addEventListener('submit', (event) => {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
    }
}