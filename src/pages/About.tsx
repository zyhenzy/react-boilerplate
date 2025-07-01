import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Divider, Link } from '@mui/material';

const About = () => {
    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Card elevation={3}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid>
                            <Avatar
                                src={require('../assets/logo.jpg')}
                                alt="XYZ Travel"
                                sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}
                            />
                        </Grid>
                        <Grid>
                            <Typography variant="h5" fontWeight="bold">
                                XYZ TRAVEL
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                MAKE IT EASY
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" fontWeight="bold">
                        Liyang.Yu
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Chief Executive Officer
                    </Typography>

                    <Typography variant="body2">
                        <strong>Company:</strong> PT. XYZ Travel Management
                    </Typography>
                    <Typography variant="body2">
                        <strong>Tel:</strong> +62 819 7543 543 (ID), +86 185 1869 3631 (CN)
                    </Typography>
                    <Typography variant="body2">
                        <strong>Email:</strong>{' '}
                        <Link href="mailto:sales@xyz-travelindonesia.com">
                            sales@xyz-travelindonesia.com
                        </Link>
                    </Typography>
                    <Typography variant="body2">
                        <strong>Address:</strong> Jl. Puri Indah Raya Blok U 1, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Box>
                            <Typography variant="caption">WeChat</Typography>
                            <img
                                src={require('../assets/weChat.png')}
                                alt="WeChat QR"
                                width={100}
                            />
                        </Box>
                        <Box>
                            <Typography variant="caption">WhatsApp</Typography>
                            <img
                                src={require('../assets/WhatsApp.png')}
                                alt="WhatsApp QR"
                                width={100}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Card elevation={1} sx={{ mt: 4, bgcolor: '#00b894', color: 'white', textAlign: 'center', py: 3 }}>
                <Typography variant="h6" fontStyle="italic">
                    eXperience the world, Yield the joy, <br /> feel Zero stress in XYZ Travel
                </Typography>
            </Card>
        </Box>
    );
};

export default About;
