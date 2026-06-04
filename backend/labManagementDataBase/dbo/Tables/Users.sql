CREATE TABLE [dbo].[Users] (
    [UserId]       UNIQUEIDENTIFIER NOT NULL,
    [FirstName]    NVARCHAR (50)    NOT NULL,
    [LastName]     NVARCHAR (50)    NOT NULL,
    [Email]        NVARCHAR (100)   NOT NULL,
    [PasswordHash] VARBINARY (MAX)  NOT NULL,
    [PasswordSalt] VARBINARY (MAX)  NOT NULL,
    [isLogged]     BIT              DEFAULT (CONVERT([bit],(0))) NOT NULL,
    [secretKey]    NVARCHAR (MAX)   NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Email]
    ON [dbo].[Users]([Email] ASC);

