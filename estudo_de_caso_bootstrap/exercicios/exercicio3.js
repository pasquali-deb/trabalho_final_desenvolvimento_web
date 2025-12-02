  function calcularReajuste() {
        var saraioAtual= document.getElementById('salarioAtual').value;
        var reajuste;
        var tempoServico;
        var bonus;
        var idade = parseInt(saraioAtual);
        var tempoServico = document.getElementById('tempoServico').value;
        if (tempo < 1 && salario <= 500){
            reajuste = salario * 0.25;
            resultado.innerHTML = "O reajuste salarial é de R$ " + reajuste.toFixed(2);
            bonus = null;

        }
        else if (tempo >=1 && tempo<=3 && salario > 500 && salario <= 1000){
            reajuste = salario * 0.20;
            resultado.innerHTML = "O reajuste salarial é de R$ " + reajuste.toFixed(2);
            bonus = 100;
        }
        else if (tempo > 3 && tempo <=6 && salario >1000 && salario <= 1500){
            reajuste = salario *0.15;
            resultado.innerHTML = "O reajuste salarial é de R$ " + reajuste.toFixed(2);
            bonus=200
        }
        else if (tempo > 6 && tempo <=10 && salario >1500 && salario <= 2000){
            reajuste = salario *0.10;
            resultado.innerHTML = "O reajuste salarial é de R$ " + reajuste.toFixed(2);
            bonus=300;

        }
        else if (tempo >10 && salario >2000){
            reajuste = null;
            resultado.innerHTML = "O funcionário não tem direito a reajuste salarial.";
            bonus=500;
        }

    }
     console.log("O salário atual é de R$ " + salarioAtual + ", o tempo de serviço é de " + tempoServico + " anos, o reajuste salarial é de R$ " + reajuste.toFixed(2) + ", o bônus é de R$ " + bonus);