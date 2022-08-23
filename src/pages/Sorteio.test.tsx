import { act, fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio";
import Sorteio from "./Sorteio";

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})
jest.mock('../state/hooks/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: jest.fn()
    }
})

describe('Na pagina de sorteio', () => {
    const participantes = ['Luis', 'Fernando', 'Rodrigo'];
    const resultado = new Map([
        ['Luis', 'Fernando'],
        ['Fernando', 'Ana'],
        ['Ana', 'Luis'],
    ])
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes),
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
    });
    test('Todos os participantes podem exibir o seu amigo secreto', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const opcoes = screen.queryAllByRole('option');
        expect(opcoes).toHaveLength(participantes.length + 1); //+1 -> Option padrão
    })
    test('O amigo secreto é exibido quando solicitado', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const select = screen.getByPlaceholderText('Selecione o seu nome');
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        });
        const botao = screen.getByRole('button');
        fireEvent.click(botao);
        const amigoSecreto = screen.getByRole('alert');

        expect(amigoSecreto).toBeInTheDocument()

    })

    // test('esconde o amigo secreto sorteado depois de 5 segundos', async () => {
    //     jest.useFakeTimers();

    //     render(
    //         <RecoilRoot>
    //             <Sorteio />
    //         </RecoilRoot>
    //     )

    //     const select = screen.getByPlaceholderText('Selecione o seu nome')
    //     fireEvent.change(select, { target: { value: participantes[1] } })

    //     const button = screen.getByRole('button')
    //     fireEvent.click(button)
    //     act(() => {
    //         jest.runAllTimers();
    //     })
    //     const alerta = screen.queryByRole('alert')
    //     expect(alerta).not.toBeInTheDocument()
    // })
})