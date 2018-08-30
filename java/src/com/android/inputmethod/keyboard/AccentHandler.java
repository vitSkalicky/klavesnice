package com.android.inputmethod.keyboard;

import java.text.Normalizer;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Handles presses of accent keys.
 * whenever is key pressed it should go through {@link #handleAccent(char)}.
 * if it is a accent key empty string will be returned and it will be remembered. then if it is either an accent key again, a spacing variant will be returned, or letter, text will be normalise which results in one combined character or one letter ond combining character.
 * supports only caron (u030C) and acute (u0301). to support more, add their non-spacing and spacing variants to combiningToSpacisng map.
 */
public class AccentHandler {
    private char prevAccent = 0;

    /**
     * map of non-spacing characters and their spacing variants.
     */
    private final static Map<Character, Character> combiningToSpacing;

    static {
        Map<Character, Character> m = new HashMap<>();
        m.put('\u0301', '´');
        m.put('\u030C', 'ˇ');
        combiningToSpacing = Collections.unmodifiableMap(m);
    }

    /**
     * Returns true if the character is combining accent character that can be handled by {@link AccentHandler}.
     * @param code code of the character
     */
    public static boolean isHandlableAccent(char code){
        return combiningToSpacing.containsKey(code);
    }

    /**
     * gets last pressed key and remembers/adds accent
     */
    public String handleAccent(char last) {
        //if last pressed was an accent key
        if (Character.getType(last) == Character.NON_SPACING_MARK) { // if combining character is inputed
            if (prevAccent != 0) { // if there was one before
                Character ret = combiningToSpacing.get(last);
                prevAccent = 0;
                if (ret == null)
                    return "";
                return ret.toString();
            } else { // if it is first on in row
                prevAccent = last;
                return "";
            }
        } else if (Character.getType(last) == Character.SPACE_SEPARATOR && prevAccent != 0) { // if it is space and there is one accent remembered, we print the accent
            Character ret = combiningToSpacing.get(prevAccent);
            prevAccent = 0;
            if (ret == null)
                return "";
            return ret.toString();
        } else if (prevAccent == 0) { // if there was no accent remembered
            return last + "";
        } else { // if we input letter and there was an accent remembered, we normalise them together
            String ret = Normalizer.normalize(last + "" + prevAccent, Normalizer.Form.NFC);
            prevAccent = 0;
            return ret;
        }
    }
}
