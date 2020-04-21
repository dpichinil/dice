package cl.kumesoft.dados.dto;

import java.util.ArrayList;
import java.util.List;

public class GameDto {
    private boolean modify;
    private String tokenCreador;
    private List<PlayerDto> listPlayers;
    private ThrowDto throwDice;

    public boolean getModify() {
        return modify;
    }

    public void setModify(boolean modify) {
        this.modify = modify;
    }

    public String getTokenCreador() {
        return tokenCreador;
    }

    public void setTokenCreador(String tokenCreador) {
        this.tokenCreador = tokenCreador;
    }

    public List<PlayerDto> getListPlayers() {
        if(listPlayers==null){
            listPlayers = new ArrayList<>();
        }
        return listPlayers;
    }

    public void setListPlayers(List<PlayerDto> listPlayers) {
        this.listPlayers = listPlayers;
    }

    public ThrowDto getThrowDice() {
        return throwDice;
    }

    public void setThrowDice(ThrowDto throwDice) {
        this.throwDice = throwDice;
    }
}
