function validate(el,modifiers,bindindValue) {
    bindindValue = bindindValue && typeof bindindValue === 'object' ? bindindValue : {};
    const value = typeof el.value === 'string' ? el.value.trim() :'';
    const { title='该项', error } = bindindValue ;
    let defaultError = '';

    if(modifiers.required && value === ''){
        defaultError = `${title}不能为空`;

    }else if(bindindValue.target){
        const target = document.querySelector(bindindValue.target);
        const targetValue = target ? target.value : null ;
        if(targetValue !== value){
            defaultError = `输出的${title}不匹配`;
        }
    }else if(bindindValue.regex){
        try {
            if(!bindindValue.regex.test(value)){
                defaultError = `输出的${title}格式不正确`;
            }
        }catch (e){

        }
    }

    if(defaultError){
        if(error === undefined){
            showError(el,defaultError);
        }else{
            showError(el,error);
        }
    }else{
        showError(el);
    }
}

function showError(el,error) {
    const parentElement = el.parentElement;
    const errorElement = getErrorElement(el);

    if(error == undefined){
        errorElement.style.display = 'none';
        parentElement.classList.remove('has-error');
    }else{
        errorElement.textContent = error;
        errorElement.style.display = 'block';
        parentElement.classList.add('has-error');
    }
}

function getErrorElement(el) {
    const parentElement = el.parentElement;
    let errorElement = parentElement.querySelector('.help-block');
    if(!errorElement){
        const tpl = '<span class="help-block"></span>';
        const flagment = document.createRange().createContextualFragment(tpl);
        parentElement.appendChild(flagment);
        errorElement = parentElement.querySelector('.help-block');
    }
    return errorElement;
}
export default {
    bind(el, binding, vnode) {
        const { value, arg, modifiers } = binding
        const eventType = ['change', 'blur', 'input'].indexOf(arg) !== -1 ? arg : 'change'
        const defaultHandler = () => {
            showError(el)
        }
        const handler = () => {
            validate(el, modifiers, value)
        }

        el.addEventListener('input', defaultHandler, false)
        el.addEventListener(eventType, handler, false)

        el.destroy = () => {
            el.removeEventListener('input', defaultHandler, false)
            el.removeEventListener(eventType, handler, false)
            el.destroy = null
        }
    },
    inserted(el, binding, vnode) {
        const { value, modifiers } = binding
        const form = el.closest('[data-validator-form]')
        const submitBtn = form ? form.querySelector('[type=submit]') : null

        if (submitBtn) {
            const submitHandler = () => {
                validate(el, modifiers, value)

                const errors = form.querySelectorAll('.has-error')

                if (!errors.length) {
                    submitBtn.canSubmit = true
                } else {
                    submitBtn.canSubmit = false
                }
                submitBtn.setAttribute('canSubmit',submitBtn.canSubmit);
            }

            submitBtn.addEventListener('click', submitHandler, false)

            el.destroySubmitBtn = () => {
                submitBtn.removeEventListener('click', submitHandler, false)
                el.destroySubmitBtn = null
            }
        }
    },
    unbind(el) {
        el.destroy()
        if (el.destroySubmitBtn) el.destroySubmitBtn()
    }

}