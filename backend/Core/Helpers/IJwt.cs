using Core.Dtos;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Helpers
{
	public interface IJwt
	{
        string GenerateToken(UserResponseDto user, Clients client);

    }
}
