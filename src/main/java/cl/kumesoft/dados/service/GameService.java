package cl.kumesoft.dados.service;

import cl.kumesoft.dados.dto.GameDto;
import cl.kumesoft.dados.dto.PlayerDto;
import cl.kumesoft.dados.dto.ResponseDto;
import cl.kumesoft.dados.util.RandomSequence;
import cl.kumesoft.dados.dto.ThrowDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameService {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    private static int SEQUENCE_NUMBER = 1;
    public static Map<String, GameDto> games;

    public GameService() {
        games = new HashMap<String, GameDto>();
    }

    public ResponseDto createGame(String token, ThrowDto dto) {
        ResponseDto response = null;
        String keyGame = "";
        try {
            int value = generateSecuence();
            keyGame = obfuscateSequence(value);
            int result = addGame(keyGame, token, dto.getPlayer());
            if (result > 0) {
                response = new ResponseDto(0, "Juego generado", keyGame);
            }else{
                response = new ResponseDto(1001, "Juego no generado");
            }
        }catch (Exception e){
            response = new ResponseDto(1000, "Error al generar el juego");
        }
        return response;
    }

    public ResponseDto joinGame(String token, ThrowDto dto) {
        ResponseDto response = null;
        try {
            PlayerDto player = new PlayerDto();
            player.setToken(token);
            player.setPlayer(dto.getPlayer());
            games.get(dto.getKey()).getListPlayers().add(player);
            response = new ResponseDto(0, "Token agregado al juego", 1);
        } catch (Exception e){
            response = new ResponseDto(1000,"Error al unirse al juego");
        }
        return response;
    }

    public ResponseDto throwDice(ThrowDto dto, String token) {
        logger.info("================= INICIO THROW =============");
        ResponseDto response = null;
        try {
            List<Integer> list = new ArrayList<>();
            GameDto game = games.get(dto.getKey());
            List<PlayerDto> listPlayers = game.getListPlayers();
            if(findToken(listPlayers, token) ){
                if(game.getModify()){
                    PlayerDto player = getPlayer(listPlayers, token);
                    dto.setPlayer(player.getPlayer());
                    int large = dto.getDiceCount();
                    for (int index = 0; index < large; index++) {
                        Random random = new Random();
                        int min = 1, max = 10;
                        int num = random.nextInt((max - min) + 1) + min;
                        list.add(num);
                    }
                    dto = evaluateGeneratedNumber(list, dto);

                    dto.setListDice(list);
                    game.setThrowDice(dto);
                    game.setModify(false);
                    games.replace(dto.getKey(), game);
                    response = new ResponseDto(0, "se envia nuevo lanzamiento de dados", dto);
                } else {
                    response = new ResponseDto(0, "se envia ultima lanzamiento de datos generado", game.getThrowDice());
                }
            } else {
                response = new ResponseDto(1001, "Usuario no unido al juego", dto);
            }
        } catch (Exception e) {
            response = new ResponseDto(1000, "Error al generar el lanzamiento");
        }
        logger.info("============== FIN THROW ===============");
        return response;
    }

    private boolean findToken(List<PlayerDto> listPlayers, String token) {
        boolean response = false;
        for (int i = 0; i < listPlayers.size(); i++) {
            PlayerDto player = listPlayers.get(i);
            if(player.getToken().equals(token)){
                response = true;
                i = listPlayers.size() + 1;
            }
        }
        return response;
    }

    private PlayerDto getPlayer(List<PlayerDto> listPlayers, String token) {
        PlayerDto response = new PlayerDto();
        for (int i = 0; i < listPlayers.size(); i++) {
            PlayerDto player = listPlayers.get(i);
            if(player.getToken().equals(token)){
                response = player;
                i = listPlayers.size() + 1;
            }
        }
        return response;
    }

    public ResponseDto getThrowDice(String key, String token) {
        ResponseDto response = null;
        try {
            GameDto game = (GameDto) games.get(key);
            if(findToken(game.getListPlayers(), token)){
                ThrowDto dto = game.getThrowDice();
                response = new ResponseDto(0, "Jugada obtenida", dto);
            }else{
                response = new ResponseDto(1001, "El usuario no se encuentra agregado al guego");
            }
        } catch (Exception e) {
            response = new ResponseDto(1000, "Error al obtener la tirada");
        }

        return response;
    }

    public ResponseDto removeGame(String key, String token) {
        ResponseDto response = null;
        try {
            GameDto game = games.get(key);
            if(game.getTokenCreador().equals(token)){
                games.remove(key);
                response = new ResponseDto(0,"Juego eliminado");
            }else{
                response = new ResponseDto(1001,"Usuario no puede eliminar el juego");
            }
        } catch (Exception e) {
            response = new ResponseDto(1000,"Error al intentar eliminar el juego");
        }
        return response;
    }

    public ResponseDto modifyGame(String key, String token) {
        ResponseDto response = null;
        try {
            GameDto game = games.get(key);
            if(game.getTokenCreador().equals(token)){
                game.setModify(true);
                games.replace(key, game);
                response = new ResponseDto(0,"se ha habilitado la modificacion de dados");
            } else {
                response = new ResponseDto(1001,"Usuario no habilitado para modificar");
            }
        } catch (Exception e){
            response = new ResponseDto(1000,"error al modificar");
        }
        return response;
    }



    /*
    * Metod privates for games
    */
    private ThrowDto evaluateGeneratedNumber(List<Integer> list, ThrowDto dto) {
        int faultCount = 0, successCount = 0, extraSuccessCount = 0;
        for (Integer num : list) {
            logger.info("num: " + num);
            if (num == 1) {
                faultCount++;
                logger.debug("FAULT");
            } else if (num == 10) {
                extraSuccessCount++;
                logger.debug("EXTRA-SUCCESS");
            } else if (num >= dto.getDifficult() && num < 10) {
                successCount++;
                logger.debug("SUCCESS");
            } else if (num > 1) {
                logger.debug("NONE");
            } else {
                logger.debug("ERROR");
            }
        }
        logger.debug("faultCount: " + faultCount);
        logger.debug("extraSuccessCount: " + extraSuccessCount);
        logger.debug("successCount: " + successCount);
        boolean flag1 = true;
        int faultAux = (faultCount * -1), extraAux = extraSuccessCount, successAux = successCount, descuento = 0;
        while (faultAux < 0 && flag1) {
            descuento = 0;
            logger.debug("------ CALCULANDO -----");
            logger.debug("faultAux: " + faultAux);
            logger.debug("extraAux: " + extraAux);
            logger.debug("successAux: " + successAux);
            if (extraAux == 0 && successAux > 0) {
                descuento++;
                successAux--;
            }
            if (extraAux > 0) {
                descuento++;
                extraAux--;
            }
            if (descuento > 0) {
                logger.debug("quitando fallo");
                faultAux++;
            } else {
                logger.debug("desactivando while");
                flag1 = false;
            }
        }
        logger.debug("-----------");
        logger.debug("faultAux: " + faultAux);
        logger.debug("extraAux: " + extraAux);
        logger.debug("successAux: " + successAux);
        if (faultAux < 0) {
            dto.setResultCount(faultAux);
            dto.setResultText("FALL0");
        } else {
            int modifier = 1;
            if(10 != dto.getDifficult()){
                modifier=2;
            }
            logger.debug("agragando diferencia");
            int total = (extraAux * modifier) + successAux;
            logger.debug("total: " + total);
            dto.setResultCount(total);
            if(dto.getResultCount()==0){
                dto.setResultText("PERDIDA");
            }else{
                dto.setResultText("EXITO");
            }
        }
        return dto;
    }

    private int addGame(String keyGame, String token, String playerName) {
        try {
            PlayerDto player = new PlayerDto();
            player.setToken(token);
            player.setPlayer(playerName);
            GameDto dto = new GameDto();
            dto.setTokenCreador(token);
            dto.getListPlayers().add(player);
            games.put(keyGame, dto);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    private synchronized int generateSecuence() {
        int value = SEQUENCE_NUMBER + 1;
        SEQUENCE_NUMBER = value;
        return value;
    }

    private String obfuscateSequence(int value) {
        String sequence = "";
        try {
            return RandomSequence.getMap(value);
        } catch (Exception e) {
            sequence = "";
        }
        return sequence;
    }



}
