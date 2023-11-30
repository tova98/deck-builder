package hr.ntovernic.deckbuilder.security;

import hr.ntovernic.deckbuilder.exception.InvalidTokenException;
import hr.ntovernic.deckbuilder.model.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenProvider {

    private static final String SECRET_KEY_STRING = "eThWmZq4t7w!z%C&F)J@NcRfUjXn2r5u";
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes(StandardCharsets.UTF_8));
    public static final long JWT_TOKEN_VALIDITY_DURATION = 24L * 60 * 60 * 1000;

    private final UserDetailsService userDetailsService;

    public String generateToken(final String username, final Role role) {
        final Claims claims = Jwts.claims().setSubject(username);
        claims.put("auth", new SimpleGrantedAuthority(role.getAuthority()));

        final Date now = new Date();
        final Date validity = new Date(now.getTime() + JWT_TOKEN_VALIDITY_DURATION);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SECRET_KEY)
                .compact();
    }

    public boolean validateToken(final String token) throws InvalidTokenException {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (final JwtException | IllegalArgumentException e) {
            throw new InvalidTokenException("Expired or invalid JWT token!");
        }
    }

    public Authentication getAuthentication(final String token) {
        final String username = getUsername(token);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUsername(final String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
