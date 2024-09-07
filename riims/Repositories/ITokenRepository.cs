using riims.Models.Domain;

namespace riims.Repositories
{
    public interface ITokenRepository
    {
        string CreateJWTToken(User user, List<string> roles);

    }
}
