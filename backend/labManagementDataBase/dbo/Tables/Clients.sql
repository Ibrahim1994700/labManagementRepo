CREATE TABLE [dbo].[Clients] (
    [ClientId]    UNIQUEIDENTIFIER NOT NULL,
    [FirstName]   NVARCHAR (50)    NOT NULL,
    [SecondName]  NVARCHAR (50)    NULL,
    [LastName]    NVARCHAR (50)    NOT NULL,
    [PhoneNumber] NVARCHAR (15)    NOT NULL,
    [IsActive]    BIT              NOT NULL,
    CONSTRAINT [PK_Clients] PRIMARY KEY CLUSTERED ([ClientId] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Clients_PhoneNumber]
    ON [dbo].[Clients]([PhoneNumber] ASC);

