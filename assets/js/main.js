//const cpfEnviado = document.querySelector('.cpftext')
const res = document.querySelector('.res')
const form = document.querySelector('.form')
let cpfEnviado = ''

form.addEventListener('submit', function (e) {
    e.preventDefault()
    const inputCPF = e.target.querySelector('.cpftext');
    let cpfEnviado = inputCPF.value
    //console.log(cpfEnviado)
    const cpf = new ValidaCPF(cpfEnviado);
    console.log(cpfEnviado)
    cpf.valida()
   
})


function ValidaCPF(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo', {
        get: function() {
            return cpfEnviado.replace(/\D+/g, '')

        }
    })

}

ValidaCPF.prototype.valida = function(){
    if(typeof this.cpfLimpo === 'undefined') return false;   
    if(this.cpfLimpo.length !== 11) alert('Insira um CPF');

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial)
    const digito2 = this.criaDigito(cpfParcial + digito1)
    cpfConferido = cpfParcial + digito1 + digito2;
    if ( this.cpfLimpo === cpfConferido) {
        res.innerHTML = 'O CPF é válido'
    } else { res.innerHTML = 'O CPF é inválido' }
    return true
};
 
ValidaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;

    }, 0)

    const digito = 11 - (total % 11);
    return digito > 9 ? 0 : digito;
    
}

