document.addEventListener('DOMContentLoaded', () => {

    // --- EXERCÍCIO 1: CLASSE FUNCIONÁRIO ---
    //
    class Funcionario {
        // Construtor com os atributos
        constructor(id, nome, idade, cargo, salario) {
            this.id = id;
            this.nome = nome;
            this.idade = idade;
            this.cargo = cargo;
            this.salario = salario;
        }

        // Métodos de acesso (Getters) [cite: 78]
        getId() { return this.id; }
        getNome() { return this.nome; }
        getIdade() { return this.idade; }
        getCargo() { return this.cargo; }
        getSalario() { return this.salario; }

        // Métodos de acesso (Setters) [cite: 78, 86]
        setNome(novoNome) { this.nome = novoNome; }
        setIdade(novaIdade) { this.idade = novaIdade; }
        setCargo(novoCargo) { this.cargo = novoCargo; }
        setSalario(novoSalario) { this.salario = novoSalario; }

        // Método toString() [cite: 78]
        toString() {
            return `ID: ${this.id} | Nome: ${this.nome} | Cargo: ${this.cargo} | Salário: R$ ${this.salario.toFixed(2)}`;
        }
    }

    // --- ESTADO DA APLICAÇÃO ---
    let funcionarios = []; // [cite: 74]
    let nextId = 1;
    let modoEdicao = false;
    let idEdicao = null;

    // --- SELETORES DO DOM ---
    const form = document.getElementById('form-funcionario');
    const inputId = document.getElementById('funcionario-id');
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const inputCargo = document.getElementById('cargo');
    const inputSalario = document.getElementById('salario');
    const btnSalvar = document.getElementById('btn-salvar');
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const relatorioOutput = document.getElementById('relatorio-output');

    // --- EVENTO PRINCIPAL DO FORMULÁRIO (Exercícios 1, 2 e 3) ---
    //
    // Exercício 3: Usando função anônima (arrow function) no evento [cite: 91, 95]
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento

        // Coleta de dados
        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value);
        const cargo = inputCargo.value;
        const salario = parseFloat(inputSalario.value);

        if (modoEdicao) {
            // --- EXERCÍCIO 2: LÓGICA DE EDIÇÃO ---
            
            // Exercício 3: Usando arrow function para buscar [cite: 92, 94]
            const index = funcionarios.findIndex(func => func.getId() === idEdicao);

            if (index !== -1) {
                const func = funcionarios[index];
                // Exercício 2: Usando métodos 'set' para atualizar [cite: 86]
                func.setNome(nome);
                func.setIdade(idade);
                func.setCargo(cargo);
                func.setSalario(salario);
                console.log(`Funcionário "${nome}" atualizado.`);
            }
            
            // Reseta modo de edição
            modoEdicao = false;
            idEdicao = null;
            btnSalvar.textContent = 'Salvar';

        } else {
            // --- EXERCÍCIO 1: LÓGICA DE CADASTRO ---
            const novoFuncionario = new Funcionario(nextId, nome, idade, cargo, salario);
            nextId++;
            funcionarios.push(novoFuncionario); // [cite: 76]
            console.log(`Funcionário "${nome}" cadastrado.`);
        }

        renderizarTabela();
        form.reset();
        inputId.value = ''; // Garante que o ID oculto seja limpo
    });

    // --- FUNÇÕES DE RENDERIZAÇÃO E AÇÕES ---

    // Função para renderizar a tabela 
    function renderizarTabela() {
        tabelaCorpo.innerHTML = '';

        funcionarios.forEach(func => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${func.getNome()}</td>
                <td>${func.getIdade()}</td>
                <td>${func.getCargo()}</td>
                <td>R$ ${func.getSalario().toFixed(2)}</td>
                <td>
                    <button class="btn-editar">Editar</button> <button class="btn-excluir">Excluir</button> </td>
            `;

            // --- EXERCÍCIOS 2 e 3: EVENTOS DE BOTÕES ---

            // Botão Editar
            // Exercício 2 e 3: Usando função anônima tradicional [cite: 86, 91]
            tr.querySelector('.btn-editar').addEventListener('click', function() {
                iniciarEdicao(func);
            });

            // Botão Excluir
            // Exercício 3: Usando arrow function (lambda) [cite: 95]
            tr.querySelector('.btn-excluir').addEventListener('click', () => {
                excluirFuncionario(func.getId(), func.getNome());
            });

            tabelaCorpo.appendChild(tr);
        });
    }

    // Função para carregar dados no formulário para edição [cite: 85]
    function iniciarEdicao(funcionario) {
        inputId.value = funcionario.getId();
        inputNome.value = funcionario.getNome();
        inputIdade.value = funcionario.getIdade();
        inputCargo.value = funcionario.getCargo();
        inputSalario.value = funcionario.getSalario();

        modoEdicao = true;
        idEdicao = funcionario.getId();
        btnSalvar.textContent = 'Atualizar';
        inputNome.focus();
    }

    // Função para excluir um funcionário
    function excluirFuncionario(id, nome) {
        if (confirm(`Tem certeza que deseja excluir o funcionário "${nome}"?`)) {
            // Exercício 3: Usando arrow function (filter) para remoção [cite: 94]
            funcionarios = funcionarios.filter(func => func.getId() !== id);
            renderizarTabela();
            console.log(`Funcionário "${nome}" excluído.`);
        }
    }

    // --- EXERCÍCIO 4: RELATÓRIOS (map, filter, reduce) [cite: 97, 106] ---
    //
    const formatarRelatorio = (titulo, dados) => {
        let texto = `${titulo}:\n`;
        if (Array.isArray(dados)) {
            texto += dados.length > 0 ? dados.join('\n') : "Nenhum dado encontrado.";
        } else {
            texto += dados;
        }
        relatorioOutput.textContent = texto;
    };

    // 1. Listar salários > R$ 5000 [cite: 101]
    document.getElementById('btn-salario-maior-5k').addEventListener('click', () => {
        // Uso do 'filter'
        const filtrados = funcionarios.filter(f => f.getSalario() > 5000);
        // Uso do 'map'
        const lista = filtrados.map(f => f.toString());
        formatarRelatorio("Funcionários com Salário > R$ 5.000", lista);
    });

    // 2. Média Salarial [cite: 102]
    document.getElementById('btn-media-salarial').addEventListener('click', () => {
        if (funcionarios.length === 0) {
            formatarRelatorio("Média Salarial", "Nenhum funcionário cadastrado.");
            return;
        }
        // Uso do 'reduce'
        const totalSalarios = funcionarios.reduce((acc, f) => acc + f.getSalario(), 0);
        const media = (totalSalarios / funcionarios.length).toFixed(2);
        formatarRelatorio("Média Salarial", `R$ ${media}`);
    });

    // 3. Cargos Únicos [cite: 103]
    document.getElementById('btn-cargos-unicos').addEventListener('click', () => {
        // Uso do 'map'
        const todosCargos = funcionarios.map(f => f.getCargo());
        // Uso do 'Set' para obter valores únicos [cite: 106]
        const cargosUnicos = [...new Set(todosCargos)];
        formatarRelatorio("Cargos Únicos na Empresa", cargosUnicos);
    });

    // 4. Nomes em Maiúsculo [cite: 104]
    document.getElementById('btn-nomes-maiusculos').addEventListener('click', () => {
        // Uso do 'map'
        const nomesMaiusculos = funcionarios.map(f => f.getNome().toUpperCase());
        formatarRelatorio("Nomes dos Funcionários (em maiúsculo)", nomesMaiusculos);
    });

    // Renderização inicial
    renderizarTabela();
});