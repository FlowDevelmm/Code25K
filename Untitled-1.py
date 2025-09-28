class Estudante:
    def __init__(self, nome, curso):
        self.nome = nome
        self.curso = curso

    def apresentar(self):
        return f'Sou {self.nome} e estudo {self.curso}.'

aluno = Estudante('Ana', 'Engenharia Informática')
print(aluno.apresentar())
Exemplo de Função Recursiva:
def fatorial(n):
    if n == 0:
        return 1
    return n * fatorial(n-1)

print(fatorial(5))  # Saída: 120
