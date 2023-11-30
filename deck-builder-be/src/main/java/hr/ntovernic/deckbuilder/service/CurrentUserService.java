package hr.ntovernic.deckbuilder.service;

import hr.ntovernic.deckbuilder.model.Role;
import hr.ntovernic.deckbuilder.model.User;
import hr.ntovernic.deckbuilder.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final UserRepository userRepository;

    public String getCurrentUserUsername() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }

    public User getCurrentUser() {
        final String currentUserUsername = getCurrentUserUsername();

        return userRepository.findByUsername(currentUserUsername);
    }

    public boolean isCurrentUserAdmin() {
        final User currentUser = getCurrentUser();

        return Role.ROLE_ADMIN.equals(currentUser.getRole());
    }

    public boolean isCurrentUserMakingRequest(final Long id) {
        final User currentUser = getCurrentUser();
        return Objects.equals(currentUser.getId(), id);
    }
}
