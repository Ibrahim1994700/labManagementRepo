CREATE TABLE [dbo].[UsersAndServices] (
    [UsersAndServicesId] UNIQUEIDENTIFIER NOT NULL,
    [UserId]             UNIQUEIDENTIFIER NOT NULL,
    [ServiceId]          UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_UsersAndServices] PRIMARY KEY CLUSTERED ([UsersAndServicesId] ASC),
    CONSTRAINT [FK_UsersAndServices_Services_ServiceId] FOREIGN KEY ([ServiceId]) REFERENCES [dbo].[Services] ([ServiceId]) ON DELETE CASCADE,
    CONSTRAINT [FK_UsersAndServices_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([UserId]) ON DELETE CASCADE
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_UsersAndServices_UserId_ServiceId]
    ON [dbo].[UsersAndServices]([UserId] ASC, [ServiceId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_UsersAndServices_ServiceId]
    ON [dbo].[UsersAndServices]([ServiceId] ASC);

