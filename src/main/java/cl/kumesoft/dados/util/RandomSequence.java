package cl.kumesoft.dados.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Random;

public class RandomSequence {
    private static Logger log = LoggerFactory.getLogger(RandomSequence.class);
    private static final int SIZE = 62;
    private static final int SIZE0 = 1;
    private static final int SIZE1 = SIZE0 * SIZE;
    private static final int SIZE2 = SIZE1 * SIZE;
    private static final int SIZE3 = SIZE2 * SIZE;
    private static final int SIZE4 = SIZE3 * SIZE;
    private static final int DELTA = SIZE0 + SIZE1 + SIZE2 + SIZE3;
    private static final int MAX_ELEMENT = SIZE4;

    /*************************************************
     MCD(MAX_ELEMENT, DELTA) = 1 =>  Anillo sin divisores de cero (i.e. el mapping es biyectivo)
     En este caso MAX_ELEMENT = 62^4 = 14776336 y DELTA = 242235
     MCD(14776336, 242235) = 1
     http://www.calculadoras.uno/mcd/
     Lo anterior es siempre cierto por construccion de DELTA y MAX_ELEMENT
     *************************************************/

    private static final int[][] P = {
            {60, 42, 26, 46, 9, 28, 25, 43, 18, 20, 34, 35, 21, 14, 39, 3, 57, 48, 13, 7, 36, 24, 19, 56, 22, 54, 0, 47, 38, 59, 32, 55, 33, 53, 5, 50, 4, 1, 15, 51, 52, 6, 45, 16, 58, 40, 23, 27, 30, 61, 10, 8, 29, 37, 41, 31, 11, 2, 44, 12, 17, 49},
            {2, 16, 38, 59, 37, 40, 25, 46, 41, 17, 42, 11, 19, 22, 49, 36, 56, 23, 27, 43, 26, 50, 45, 0, 6, 34, 54, 61, 12, 24, 3, 52, 15, 33, 18, 9, 8, 57, 5, 13, 35, 1, 39, 30, 58, 51, 29, 28, 55, 4, 10, 7, 53, 20, 60, 32, 47, 31, 14, 48, 44, 21},
            {8, 4, 9, 0, 7, 52, 35, 57, 56, 61, 42, 14, 37, 2, 44, 11, 43, 38, 48, 6, 1, 30, 53, 21, 5, 27, 3, 22, 60, 50, 55, 26, 24, 16, 49, 59, 18, 19, 20, 36, 29, 28, 34, 25, 13, 17, 41, 47, 45, 39, 46, 51, 12, 10, 32, 40, 54, 33, 58, 31, 23, 15},
            {20, 7, 33, 59, 46, 49, 18, 40, 55, 17, 47, 30, 28, 23, 14, 36, 38, 45, 34, 32, 3, 9, 60, 50, 22, 48, 37, 1, 58, 27, 19, 5, 26, 56, 51, 35, 31, 44, 4, 61, 53, 21, 16, 42, 8, 54, 12, 10, 52, 11, 25, 13, 41, 57, 0, 43, 24, 29, 2, 15, 39, 6}
    };

//    public static void main(String[] args)
//    {
//		try
//		{
//			int limit = Integer.parseInt(args[0]);
//
//            for (int index = 0; index < limit; index++)
//            {
//                String map = shortNameImage.getMap(index);
//			    System.out.println(map);
//            }
//
//		}
//		catch (Exception e)
//		{
//			e.printStackTrace();
//		}
//
//    }

    public static String getMap(int index) throws Exception
    {
        if (index >= MAX_ELEMENT)
        {
            throw new Exception("Invalid index value: " + index);
        }

        int code = (int)((1L * index * DELTA) % MAX_ELEMENT);

        int part0 = (code / SIZE0) % SIZE;
        int part1 = (code / SIZE1) % SIZE;
        int part2 = (code / SIZE2) % SIZE;
        int part3 = (code / SIZE3) % SIZE;

        char c0 = encode(P[0][part0]);
        char c1 = encode(P[1][part1]);
        char c2 = encode(P[2][part2]);
        char c3 = encode(P[3][part3]);

        char data[] = {c3, c2, c1, c0};
        return new String(data);
    }

    private static char encode(int code) throws Exception
    {
        if (code < 0 || code >= SIZE)
        {
            throw new Exception("Invalid value to encode: " + code);
        }

        switch (code)
        {
            /* 0-9 */
            case  0 : return '0';
            case  1 : return '1';
            case  2 : return '2';
            case  3 : return '3';
            case  4 : return '4';
            case  5 : return '5';
            case  6 : return '6';
            case  7 : return '7';
            case  8 : return '8';
            case  9 : return '9';

            /* a-z */
            case 10 : return 'a';
            case 11 : return 'b';
            case 12 : return 'c';
            case 13 : return 'd';
            case 14 : return 'e';
            case 15 : return 'f';
            case 16 : return 'g';
            case 17 : return 'h';
            case 18 : return 'i';
            case 19 : return 'j';
            case 20 : return 'k';
            case 21 : return 'l';
            case 22 : return 'm';
            case 23 : return 'n';
            case 24 : return 'o';
            case 25 : return 'p';
            case 26 : return 'q';
            case 27 : return 'r';
            case 28 : return 's';
            case 29 : return 't';
            case 30 : return 'u';
            case 31 : return 'v';
            case 32 : return 'w';
            case 33 : return 'x';
            case 34 : return 'y';
            case 35 : return 'z';

            /* A-Z */
            case 36 : return 'A';
            case 37 : return 'B';
            case 38 : return 'C';
            case 39 : return 'D';
            case 40 : return 'E';
            case 41 : return 'F';
            case 42 : return 'G';
            case 43 : return 'H';
            case 44 : return 'I';
            case 45 : return 'J';
            case 46 : return 'K';
            case 47 : return 'L';
            case 48 : return 'M';
            case 49 : return 'N';
            case 50 : return 'O';
            case 51 : return 'P';
            case 52 : return 'Q';
            case 53 : return 'R';
            case 54 : return 'S';
            case 55 : return 'T';
            case 56 : return 'U';
            case 57 : return 'V';
            case 58 : return 'W';
            case 59 : return 'X';
            case 60 : return 'Y';
            case 61 : return 'Z';
        }
        return 'x';
    }

    /* se usa para generar las permutaciones del arreglo P, en tiempo de desarrollo */
    public static int permutation(int size)
    {

        Random r = new Random();

        int[] lock = new int[size];
        int[] perm = new int[size];

        for (int i = 0; i < size; i++)
        {
            perm[i] = -1;
            lock[i] = -1;
        }

        for (int i = 0; i < size; i++)
        {
            int p = r.nextInt(size - i);

            int k = 0;
            for (int j = 0; j < size; j++)
            {
                if (lock[j] == -1)
                {
                    if (k == p)
                    {
                        perm[i] = j;
                        lock[j] = 1;
                        break;
                    }
                    else
                    {
                        k++;
                    }
                }
            }
        }
        RandomSequence.log.debug("{");

        for (int i = 0; i < size - 1; i++)
        {
            RandomSequence.log.debug(perm[i] + ", ");
        }
        RandomSequence.log.debug( String.valueOf(perm[size - 1]) );
        RandomSequence.log.debug("};\n");

        return 0;
    }

}
