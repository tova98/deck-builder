package hr.ntovernic.deckbuilder.exception;

import lombok.Getter;

@Getter
public class InvalidTokenException extends Exception {
    public InvalidTokenException(String message) {
        super(message);
    }
}
