package hr.ntovernic.deckbuilder.exception;

import lombok.Getter;

@Getter
public class WrongPasswordException extends Exception {
    public WrongPasswordException(String message) {
        super(message);
    }
}
