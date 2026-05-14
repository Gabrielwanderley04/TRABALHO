let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {

    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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" // 
        },
        body: JSON.stringify({
            model: "llama-3.1-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML."
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })

    let dados = await resposta.json()

    let resultado = dados.choices[0].message.content || "Sem resposta"

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado
}

botao.addEventListener("click", gerarCodigo)