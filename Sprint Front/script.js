document.addEventListener('DOMContentLoaded', () => {
    let bancoDados = { "Pessoal": 0, "Trabalho": 0 };
    let gravando = false;
    let segundos = 0;
    let intervaloTimer;
 
    
    const botaoDisparador = document.getElementById('botaoDisparador');
    const modalSalvar = document.getElementById('modalSalvar');
    const listaPastas = document.getElementById('listaPastas');
    const visualizador = document.getElementById('visualizador');
 
    
    window.fecharModal = function(id) {
        document.getElementById(id).style.display = 'none';
    };
 
    function abrirModal(id) {
        document.getElementById(id).style.display = 'flex';
    }
 
    
    botaoDisparador.onclick = () => {
        console.log("Foto tirada!");
        visualizador.style.filter = "brightness(3)";
        setTimeout(() => {
            visualizador.style.filter = "none";
            renderizarPastas();
            abrirModal('modalSalvar');
        }, 150);
    };
 
    function renderizarPastas() {
        listaPastas.innerHTML = '';
        Object.keys(bancoDados).forEach(nome => {
            const btn = document.createElement('button');
            btn.className = 'btn-pasta'; 
            btn.innerHTML = `<i class="fas fa-folder"></i> ${nome}`;
            btn.onclick = () => {
                bancoDados[nome]++;
                alert(`Salvo em: ${nome}`);
                fecharModal('modalSalvar');
            };
            listaPastas.appendChild(btn);
        });
    }
 
    
    document.getElementById('btnCancelar').onclick = () => fecharModal('modalSalvar');
    document.getElementById('btnAdicionarPasta').onclick = () => {
        const input = document.getElementById('inputNovaPasta');
        if(input.value.trim()) {
            bancoDados[input.value.trim()] = 0;
            renderizarPastas();
            input.value = '';
        }
    };
 
    
    window.abrirGaleria = () => {
        const grade = document.getElementById('gradeGaleria');
        grade.innerHTML = '';
        Object.keys(bancoDados).forEach(nome => {
            grade.innerHTML += `
<div class="card-pasta" style="flex-direction:column">
<i class="fas fa-folder-open" style="color:#ffcc00; font-size:24px"></i>
<strong>${nome}</strong>
<span style="font-size:10px">${bancoDados[nome]} fotos</span>
</div>`;
        });
        abrirModal('modalGaleria');
    };
 
    
    document.getElementById('botaoAudio').onclick = function() {
        if(!gravando) {
            gravando = true;
            this.classList.add('gravando');
            document.getElementById('indicadorGravacao').style.display = 'flex';
            intervaloTimer = setInterval(() => {
                segundos++;
                let m = Math.floor(segundos/60).toString().padStart(2,'0');
                let s = (segundos%60).toString().padStart(2,'0');
                document.getElementById('temporizador').innerText = `${m}:${s}`;
            }, 1000);
        } else {
            if(confirm("Parar e salvar gravação?")) {
                gravando = false;
                clearInterval(intervaloTimer);
                segundos = 0;
                this.classList.remove('gravando');
                document.getElementById('indicadorGravacao').style.display = 'none';
                document.getElementById('temporizador').innerText = "00:00";
                alert("Áudio salvo!");
            }
        }
    };
});