package cl.kumesoft.dados.dto;

import java.util.List;

public class ThrowDto {

    private int diceCount;
    private String key;
    private String player;
    private int resultCount;
    private String resultText;
    private List<Integer> listDice;
    private int difficult;

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public int getDiceCount() {
        return diceCount;
    }

    public void setDiceCount(int diceCount) {
        this.diceCount = diceCount;
    }

    public int getResultCount() {
        return resultCount;
    }

    public void setResultCount(int resultCount) {
        this.resultCount = resultCount;
    }

    public String getResultText() {
        return resultText;
    }

    public void setResultText(String resultText) {
        this.resultText = resultText;
    }

    public List<Integer> getListDice() {
        return listDice;
    }

    public void setListDice(List<Integer> listDice) {
        this.listDice = listDice;
    }

    public int getDifficult() {
        return difficult;
    }

    public void setDifficult(int difficult) {
        this.difficult = difficult;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
